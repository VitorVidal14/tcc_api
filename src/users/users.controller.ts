import { Controller, Body, ValidationPipe, Post, UsePipes, Get, Param, ParseUUIDPipe, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './user.entity';

@ApiTags('Usuários')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @ApiOperation({ summary: 'Retorna todos os usuários cadastrados no banco de dados.' })
    @ApiResponse({ status: 200, description: 'Retorna uma lista com os usuários cadastrados' })
    @Get()
    getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @ApiOperation({ summary: 'Retorna o id do usuário que possui dado email' })
    @ApiParam({ name: 'email', description: 'email de identificação de um usuário' })
    @ApiResponse({ status: 200, description: 'Retorna o id do usuário.' })
    @Get('email/:email')
    getUserId(@Param('email') email: string): Promise<string> {
        return this.usersService.getUserId(email);
    }

    @ApiOperation({ summary: 'Retorna o usuário que possui dado email' })
    @ApiParam({ name: 'id', description: 'id de identificação de um usuário' })
    @ApiResponse({ status: 200, description: 'Retorna o usuário.' })
    @Get(':id')
    getUserById(@Param('id', new ParseUUIDPipe()) id: string): Promise<User> {
        return this.usersService.getUserById(id);
    }

    @ApiOperation({ summary: 'Realiza o cadastro de um novo usuário' })
    @ApiResponse({ status: 201, description: 'Retorna o usuário cadastrado.' })
    @ApiResponse({ status: 400, description: 'O email ou a senha enviados estão incorretos.' })
    @Post('signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() userCredentialsDto: UserCredentialsDto): Promise<User> {
        return this.usersService.signUp(userCredentialsDto);
    }

    @ApiOperation({ summary: 'Realiza o login do usuário' })
    @ApiResponse({ status: 201, description: 'Retorna o token de acesso do usuário.' })
    @ApiResponse({ status: 401, description: 'O email ou a senha enviados estão incorretos.' })
    @Post('signin')
    signIn(@Body(ValidationPipe) userCredentialsDto: UserCredentialsDto): Promise<boolean> {
        return this.usersService.signIn(userCredentialsDto);
    }

    @ApiOperation({ summary: 'Exclusão de um usuário cadastrado.' })
    @ApiParam({ name: 'id', description: 'id de identificação de um usuário' })
    @Delete(':id')
    deleteUser(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
        return this.usersService.deleteUser(id);
    }
}
