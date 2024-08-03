import { 
    IsBoolean, 
    IsDate, 
    IsNotEmpty, 
    IsString 
} from "class-validator";

export class CreateAppAccessDto {
    @IsString()
    @IsNotEmpty()
    appId: string;
}

export class UpdateAppAccessDto {
    @IsBoolean()
    @IsNotEmpty()
    isActive: boolean;
}